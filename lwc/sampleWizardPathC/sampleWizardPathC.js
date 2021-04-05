/*
* Author : Fam Xuan Deng
* Purpose :
* A Sample Scheme Wizard's Content Component with only initialize method implemented
*
* Revision     	Ref Number      	Release No      	Modified Date       Modified By        	Description
* --------     	----------      	----------      	-----------         ------------        -----------
* 1.0          	PCS 841         	July2021           	30-Mar-2021			Fam Xuan Deng			Created
*
*/
import { LightningElement, api, track } from 'lwc';

export default class SampleWizardPathC extends LightningElement {

    @track
    data = {
        name: '',
        age: ''
    }

    //Public Initialize Method
    @api 
    async initialize(){
        let data = await this.mockRetrieveApex()
        this.data.name = data.name
        this.data.age = data.age
        this.dispatchEvent(new CustomEvent('initialize', {}))
    }

    //Mock Apex Retrieve 
    //Delete & Do not use this in actual implementation
    mockRetrieveApex(){
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve({id: 12345, name: 'Sample Name Retrieve', age: 123})
            }, 3000);
        });
    }
}