
// import { View } from '@tarojs/components';
// import Taro, { Component } from '@tarojs/taro';
//
// import Confirm, { IMMModalConfirmProps } from './confirm';
// enum ModalType {
//     Alert,
//     Confirm
// }

// interface IMMModalConfirmList {
//     type: ModalType;
//     props: IMMModalConfirmProps & { content: string | JSX.Element; visible: boolean };
// }

// interface IMMModalListState {
//     modalList: IMMModalConfirmList[];
// }

// export class MMModalList extends Component<void, IMMModalListState> {
//     confirm(props: IMMModalConfirmProps & { content: string | JSX.Element }) {
//         const modalList = {
//             type: ModalType.Confirm,
//             props: { ...props, visible: true, onClose: () => this.del(modalList) }
//         };
//         this.setState({
//             modalList: [...this.state.modalList, modalList]
//         });
//     }

//     renderList(modalConfirmList: IMMModalConfirmList) {
//         switch (modalConfirmList.type) {
//             case ModalType.Confirm:
//             {
//                 return <Confirm {...modalConfirmList.props}>
//                     {modalConfirmList.props.content}
//                 </Confirm>;
//             }
//             default:
//             {
//                 return <View></View>;
//             }
//         }
//     }

//     render() {
//         return <View>
//             {this.state.modalList.map(value => this.renderList(value))}
//         </View>;
//     }

//     private del(modalList: IMMModalConfirmList) {
//         this.setState({
//             modalList: this.state.modalList.filter(value => value !== modalList)
//         });
//         modalList.props.onClose && modalList.props.onClose();
//     }
// }
