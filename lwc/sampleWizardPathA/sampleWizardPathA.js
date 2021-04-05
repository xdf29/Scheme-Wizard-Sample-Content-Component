import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SampleWizardPathA extends LightningElement {

    @track
    data = {
        name: ''
    }

    //Form Handler
    changeName(event){
        this.data.name = event.detail.value
    }
    
    @api
    initialize(){
        this.mockRetrieveApex()
            .then(data => {
                this.data.name = data.name
                this.dispatchEvent(new CustomEvent('initialize', {}))
            })
            .catch(err => {
                this.dispatchEvent(new CustomEvent('initialize', {}))
            })
            
    }

    @api 
    async save(){
        let response = {
            validation: false,
            save:false
        }
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);

        //Validation Success
        if(isInputsCorrect){
            response.validation = true
            try{
                let save = await this.mockSaveApex()
                //Save Success
                response.save = true
            }catch(error){
                //Save Failed
                response.save = false
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Saving Failed',
                    message: 'Saving Error',
                    variant: 'error'
                }))
            }
        }

        //Validation Failed
        this.dispatchSaveEvent(response)
    }

    dispatchSaveEvent(response){
        this.dispatchEvent(new CustomEvent('save', {
            detail: response
        }))
    }

    //Mock Apex Save 
    //Delete & Do not use this in actual implementation
    mockSaveApex(){
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(true)
                //reject('Invalid Permission')
            }, 3000);
        });
    }

    //Mock Apex Retrieve 
    //Delete & Do not use this in actual implementation
    mockRetrieveApex(){
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve({id: 12345, name: 'Test Retrieve Name'})
            }, 1000);
        });
    }

}