window.Model = function (options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            AV.init({
                appId: "GE48DNRzMw67U1hSug6vvlnA-gzGzoHsz",
                appKey: "c5qwDrKjujfiRQgstOYqOllE",
                serverURL: "https://ge48dnrz.lc-cn-n1-shared.com"
            })
        },
        fetch: function () {
            const query = new AV.Query(resourceName);
            return query.find()
        },
        save: function (object) {
            const Message = AV.Object.extend(resourceName);
            const message = new Message()
            const objKey = Object.keys(object)          
            objKey.forEach(key => {
                message.set(key,object[key])
            });
            return message.save()
        }
    }
}