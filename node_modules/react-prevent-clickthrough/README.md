# react-prevent-clickthrough #
Simple function to block event propagation and stop React's SyntheticEvent when clicking on an item.

## Installation
In your React project directory simply install via npm using

```npm i react-prevent-clickthrough```

## Usage

In your component's `onClick` event, pass it a function which calls
`preventClickthrough` before other events to ensure you cannot click on
items underneathe that item.



```
import React from 'react'
import preventClickthrough from 'react-prevent-clickthrough'

var outerContainerEvent = function(e)
{
    console.log('container has been clicked');
};

var innerContainerEvent = function(e)
{
    preventClickthrough(e);
    console.log('inner container was clicked; outer should not run!');
};

// note: innerContainerEvent could also be written:
// preventClickthrough(e, otherCallbackFn);

var SampleComponent = (props, context)=>
(
    <div onClick={outerContainerEvent} 
        style={{ border : '1px solid #000000', padding: '8px' }}
    >
        outer container
        <div onClick={innerContainerEvent}
             style={{ backgroundColor : '#FFFFFF' }}
        >
            inner container
        </div>
    </div>
);

export default SampleComponent
```

If a user clicks on SampleComponent within the "inner container", they will see that an event is fired
but not for the outer container since `preventClickthrough` disabled an event from bubbling up .


