/*
* Author : Fam Xuan Deng
* Purpose :
* A Sample Scheme Wizard's Content Component with only save method implemented
*
* Revision     	Ref Number      	Release No      	Modified Date       Modified By        	Description
* --------     	----------      	----------      	-----------         ------------        -----------
* 1.0          	PCS 841         	July2021           	30-Mar-2021			Fam Xuan Deng			Created
*
*/
import { LightningElement, api } from 'lwc';

export default class SampleWizardPathB extends LightningElement {

    data = {
        age: '',
        sample: ''
    }

    @api 
    initialize(){
        //Clear Input Error 
        let inputs = this.template.querySelectorAll("lightning-input");
        inputs.forEach(input => {
            input.setCustomValidity("");
            input.reportValidity();
        });
        this.dispatchEvent(new CustomEvent('initialize', {}));
    }

    //Input Change Handler
    changeAge(event){
        this.data.age = event.detail.value
        let ageInput = this.template.querySelector("lightning-input.age");
        ageInput.setCustomValidity(""); // clear previous value
        ageInput.reportValidity();
    }

    //Input Change Handler
    changeSample(event){
        this.data.sample = event.detail.value
        let sampleInput = this.template.querySelector("lightning-input.sample");
        sampleInput.setCustomValidity(""); // clear previous value
        sampleInput.reportValidity();
    }

    //Public Save Method
    @api 
    save(){

        let response = {
            validation: false,
            save:false
        }

        //Age Input Validation
        let ageBlankValidation = !this.data.age
        let ageMaxValidation = this.data.age && this.data.age >= 30
        let ageInput = this.template.querySelector("lightning-input");
        if (ageBlankValidation) {
            ageInput.setCustomValidity("Age Cannot be blank");
        } else {
            if(ageMaxValidation){
                ageInput.setCustomValidity("Age Cannot be greater than 30");
            }
        }
        ageInput.reportValidity()

        //Sample Input Validation
        let sampleCharacterValidation = this.data.sample && this.data.sample.length >= 5
        let sampleInput = this.template.querySelector("lightning-input.sample");
        if(sampleCharacterValidation){
            sampleInput.setCustomValidity("Sample Cannot Have More Than 5 Characters");
        }
        sampleInput.reportValidity();


        if(ageBlankValidation || ageMaxValidation || sampleCharacterValidation){
            //If Validation Failed
            this.dispatchSaveEvent(response)
        }else{
            //Validation Success
            response.validation = true
            this.mockSaveApex()
                .then(res => {
                    //Saving Success
                    response.save = true
                    this.dispatchSaveEvent(response)
                })
                .catch(err => {
                    //Saving Failed
                    this.dispatchSaveEvent(response)
                })
        }
    }

    mockSaveApex(){
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(true)
            }, 1000);
        });
    }

    dispatchSaveEvent(response){
        this.dispatchEvent(new CustomEvent('save', {
            detail: response
        }))
    }

}