/*
* Author : Fam Xuan Deng
* Purpose :
* A Sample Scheme Wizard's Content Component with initialize and save method implemented
*
* Revision     	Ref Number      	Release No      	Modified Date       Modified By        	Description
* --------     	----------      	----------      	-----------         ------------        -----------
* 1.0          	PCS 841         	July2021           	30-Mar-2021			Fam Xuan Deng			Created
*
*/
import { LightningElement, api, track } from 'lwc';

export default class SampleWizardPathA extends LightningElement {

    @track
    data = {
        name: ''
    }

    //Form Handler
    changeName(event){
        this.data.name = event.detail.value
    }
    
    //Public Initialize Method
    @api
    initialize(){
        this.mockRetrieveApex()
            .then(data => {
                this.data.name = data.name
                this.isInitialized = true
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                //Notify c-scheme-wizard on method completion
                this.dispatchEvent(new CustomEvent('initialize', {}))
            })
    }

    //Public Save Method
    @api 
    async save(){
        let response = {
            validation: false,
            save:false
        }
        //Validation Logic
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);

        if(isInputsCorrect){
            //Validation Success
            response.validation = true
            try{
                //Saving Success
                let save = await this.mockSaveApex()
                response.save = true
            }catch(error){
                //Saving Failed
                response.save = false
                console.error(error)
            }
        }
        //Notify c-scheme-wizard on method completion
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