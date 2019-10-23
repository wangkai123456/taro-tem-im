
import MMCheckbox from './index';

/**
 * 复选框列表处理
 *
 * @export
 * @class CheckBoxList
 */
export default class MMCheckBoxList {
    /**
     * 复选框
     *
     * @type {Set<Checkbox>}
     * @memberof CheckBoxList
     */
    list: Set<MMCheckbox> = new Set();

    private get checkedBox() {
        return [...this.list].find(value => value.checked);
    }

    private get checkedBoxLength() {
        return [...this.list].filter(value => value.checked).length;
    }

    add(checkbox: MMCheckbox) {
        this.list.add(checkbox);
    }

    delete(checkbox: MMCheckbox) {
        this.list.delete(checkbox);
    }

    setCheck(checkbox: MMCheckbox, checked: boolean) {
        if (checkbox.props.singleElection && checked) {
            this.list.forEach(element => {
                if (element !== checkbox) {
                    element.setChecked(false);
                }
            });
        }

        if (checkbox.props.singleElection && !checked && this.checkedBoxLength === 1 && checkbox === this.checkedBox) {
            checkbox.setChecked(true);
        }
    }
}
