/**
 * Created by janeluck on 4/6/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'

import './DataTable.less'


class Tr extends React.Component {
    render() {
        return (<tr></tr>)
    }
}

export default class DataTable extends React.Component {
    constructor(props) {
        super(props)
        this.resolveColumnsTitle = this.resolveColumnsTitle.bind(this)
        this.resolveRow = this.resolveRow.bind(this)

    }

    // 解析需要展示的列, 并从row中取出字段对应内容(文本或者虚拟dom)
    resolveRow(row, columns) {

        return this.props.columns.map((col, i) => col['datafield'])
            .map((keyName, i) => ({
                    keyName: keyName,
                    // 判断该列是否为自定义渲染
                    text: isFunction(columns[i]['cellsrenderer']) ? columns[i]['cellsrenderer'].call(this, row, columns[i], row[keyName]) : row[keyName]
                })
            )

    }

    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }


    render() {

        const {rows,source, columns, searchColumns } = this.props
        // notes: 异步操作

        return (
            <div>
                <button >高级搜索</button>
                <button >确定</button>
                <div>
                    <table>
                        <thead>
                        <tr>
                            {this.resolveColumnsTitle(columns).map((colName, i)=><th key={i}>{colName}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>

                        {
                            rows.map((row, i) => {
                                return (<tr key={i}>{this.resolveRow(row, columns).map(function (item, i) {
                                    return (<td key={i}>{item.text}</td>)
                                })} </tr>)
                            })

                        }


                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


