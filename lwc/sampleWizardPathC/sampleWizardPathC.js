import { LightningElement, api, track } from 'lwc';

export default class SampleWizardPathC extends LightningElement {

    @track
    data = {
        name: '',
        age: ''
    }

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