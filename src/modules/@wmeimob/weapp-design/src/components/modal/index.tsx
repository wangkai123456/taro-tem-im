
const alert = (_props: {
    title?: string
    message: string
    onOk?: () => void
}): void => {
    throw new Error('未实现alert函数！');
};

const confirm = (_props: {
    title?: string
    message: string
    onOk?: () => void; onCancel?: () => void;
}): void => {
    throw new Error('未实现confirm函数！');
};

const toast = (_message: string): null => {
    throw new Error('未实现toast函数！');
};

const success = (_message: string): null => {
    throw new Error('未实现success函数！');
};

const fail = (_message: string): null => {
    throw new Error('未实现fail函数！');
};

const warning = (_message: string): null => {
    throw new Error('未实现warning函数！');
};

const loading = (_message: string): null => {
    throw new Error('未实现loading函数！');
};

const modal = {
    toast,
    fail,
    alert,
    success,
    warning,
    loading,
    confirm
};

export default modal;
