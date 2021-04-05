### schemeWizard.html
In your scheme wizard html it should:
```html
<div class="content">
	<c-sample-wizard-path-a 
		class='slds-hide' oninitialize={onInitialize} 
		onsave={onSaveHandler}>
	</c-sample-wizard-path-a>
	
	<c-sample-wizard-path-b 
		class='slds-hide' onsave={onSaveHandler} >
	</c-sample-wizard-path-b>
	
	<c-sample-wizard-path-c 
		class='slds-hide' oninitialize={onInitialize}>
	</c-sample-wizard-path-c>
</div>
```

### Notes
In the sample path components provided, each of them are having slight difference, to provide a better idea and better picture on the framework. Where by some sample path component is having initialize() while some are not.

| Sample Path Component  | initialize() | save() |
| ------------ | ------------ | ------------ |
| A | ✅  (.then)| ✅  (async, await)|
| B | ❌ | ✅ (.then)|
| C | ✅  (async, await) | ❌ |
