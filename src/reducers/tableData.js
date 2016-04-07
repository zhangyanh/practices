/**
 * Created by janeluck on 4/6/16.
 */

import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
   getData
} from 'actions/dataTable'

const tableData = (state = Immutable.fromJS({  rows: []}), action) => {

    //let rows = state.get('rows')

    switch(action.type) {
        case 'TABLE_GET_DATA':
            return state.merge({rows: getData(action.source)})

        default:
            return state
    }
}




export default tableData