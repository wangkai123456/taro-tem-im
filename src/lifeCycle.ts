import { initRequestLifecycle } from './components/request/listener';
import { extendTaroNavigate } from './components/taro';

/**
 * app初始化
 *
 * @export
 */
export default function mount() {
    initRequestLifecycle();
    extendTaroNavigate();
}

