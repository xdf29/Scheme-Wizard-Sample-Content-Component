/*
* Author : Fam Xuan Deng
* Purpose :
* A Sample Scheme Wizard's Content Component with only initialize method implemented
*
* Revision     	Ref Number      	Release No      	Modified Date       Modified By        	Description
* --------     	----------      	----------      	-----------         ------------        -----------
* 1.0          	PCS 841         	July2021           	30-Mar-2021			Fam Xuan Deng			Created
* 1.1          	PCS 841         	July2021           	8-April-2021	    Fam Xuan Deng			Modified         
*/
import { LightningElement, api, track } from 'lwc';

export default class SampleWizardPathC extends LightningElement {

    @track
    _allData

    //Scheme Info Data
    schemeInfoData

    //Scheme Products Data
    schemeProductData

    @api
    get allData(){
        return this._allData
    }
    set allData(value){
        this._allData = value
        this._allData.forEach(data => {
            if(data.path === 'SchemeInfo'){
                this.schemeInfoData = data.data
            }else if(data.path === 'SchemeProducts'){
                this.schemeProductData = data.data
            }
        })
    }
}