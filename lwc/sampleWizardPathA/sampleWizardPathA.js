/*
* Author : Fam Xuan Deng
* Purpose :
* A Sample Scheme Wizard's Content Component with initialize and save method implemented
*
* Revision     	Ref Number      	Release No      	Modified Date       Modified By        	Description
* --------     	----------      	----------      	-----------         ------------        -----------
* 1.0          	PCS 841         	July2021           	30-Mar-2021			Fam Xuan Deng			Created
* 1.1          	PCS 841         	July2021           	8-April-2021	    Fam Xuan Deng			Modified         
*/
import { LightningElement, api, track } from 'lwc';

export default class SampleWizardPathA extends LightningElement {

    @api
    schemeId

    @track
    data = {
        name: 'XD'
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
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                //Notify c-scheme-wizard on method completion
                this.dispatchEvent(new CustomEvent('initialize', {}))
            })
    }

    @api
    getData(){
        return this.data
    }

    @api 
    validation(){
        //Validation Logic
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        return isInputsCorrect
    }

    //Public Save Method
    @api 
    async save(){
        let save = false
        try{
            //Saving Success
            await this.mockSaveApex()
            console.log('A Saving')
            save = true
        }catch(error){
            console.error(error)
        }
        
        //Notify c-scheme-wizard on method completion  
        this.dispatchEvent(new CustomEvent('save', {
            detail: save
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