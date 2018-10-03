/**
 * Prevents clickthrough of DOM items in React
 * @param e event containing nativeEvent property
 * @param cb optional callback to pass
 * @returns {*}
 */
module.exports = function(e, cb)
{
    if(e)
    {
        if(e.stopPropagation){ e.stopPropagation() }
        if(e.nativeEvent && e.nativeEvent.stopImmediatePropagation)
        {
            e.nativeEvent.stopImmediatePropagation()
        }
    }
    // trigger callback if one was provided
    if(cb && typeof cb == 'function'){ return cb(e) }
    else return e;                                //otherwise simply funnel back event
};