
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

const modal = {
    toast,
    alert,
    confirm
};

export default modal;
