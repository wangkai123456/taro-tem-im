import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import MMIconFont, { IMMIconfontProps } from '../icon-font';
import themes from '../styles/themes/default.modules.less';
import IconFontName from '~/components/icon-font/const';

@autobind
export default class MMItemLeftIconfont extends Component<Partial<IMMIconfontProps>> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        color: themes.gray5,
        value: IconFontName.Admin
    };

    state = {
    }

    render() {
        return <MMIconFont {...this.props as IMMIconfontProps} />;
    }
}
