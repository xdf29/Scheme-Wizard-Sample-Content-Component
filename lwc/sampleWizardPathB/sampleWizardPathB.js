import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SampleWizardPathB extends LightningElement {

    data = {
        age: '',
        sample: ''
    }

    changeAge(event){
        this.data.age = event.detail.value
        let ageInput = this.template.querySelector("lightning-input.age");
        ageInput.setCustomValidity(""); // clear previous value
        ageInput.reportValidity();
    }

    changeSample(event){
        this.data.sample = event.detail.value
        let sampleInput = this.template.querySelector("lightning-input.sample");
        sampleInput.setCustomValidity(""); // clear previous value
        sampleInput.reportValidity();
    }

    @api 
    save(){
        //Validation
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
        ageInput.reportValidity();

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
            //If Validation Success, Proceed to Saving
            response.validation = true
            this.mockSaveApex()
                .then(res => {
                    response.save = true
                    this.dispatchSaveEvent(response)
                })
                .catch(err => {
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