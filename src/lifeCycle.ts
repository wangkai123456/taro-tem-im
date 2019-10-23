import { delInjectionToken, injectionToken, watchRequest } from './components/request/listener';
import { extendTaroNavigate } from './components/taro';

/**
 * app初始化
 *
 * @export
 */
export default function mount() {
    extendTaroNavigate();
    injectionToken();
    watchRequest();
}

/**
 * app退出
 *
 * @export
 */
export function unMount() {
    delInjectionToken();
}
