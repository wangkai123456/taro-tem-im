declare namespace Taro {

    interface NavigateArguments extends navigateTo.Param {
        params?: { [key: string]: any }
    }


    function navigateTo(parameter: NavigateArguments): Promise<any>

}



