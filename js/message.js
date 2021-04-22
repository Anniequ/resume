!function () {
  var view = document.querySelector('section.message')
  var model = {
    initAV: function () {
      AV.init({
        appId: "GE48DNRzMw67U1hSug6vvlnA-gzGzoHsz",
        appKey: "c5qwDrKjujfiRQgstOYqOllE",
        serverURL: "https://ge48dnrz.lc-cn-n1-shared.com"
      })
    },
    //获取数据
    fetch:function(){
      const query = new AV.Query('Message');
      return query.find()
    },
    //创建数据
    save: function(name, content){
      const Message = AV.Object.extend('Message');
        const message = new Message()
        message.set('content', content)
        message.set('name', name)
        return message.save()
    }
  }
  var controller = {
    view: null,
    model:null,
    messageList: null,
    form:null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessageForm')
      //console.log(this.form.querySelector('input[name=content]').value)
      this.model.initAV()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch()
        .then((messages) => {
          let arr = messages.map((item) => item.attributes)
          arr.forEach(item => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.append(li)
          });
        })
    },
    bindEvents: function (){      
     this.form.addEventListener('submit', (e)=>{   //为什么要监听form，不监听button，监听form，回车也能提交
        e.preventDefault()
        let myForm = this.form
        //console.log(myForm, this.form)
        let content = myForm.querySelector('input[name=content]').value
          let name = myForm.querySelector('input[name=name]').value
          this.model.save(name,content)
          .then((object) => {
            let li = document.createElement('li')
            li.innerText = `${object.attributes.name}: ${object.attributes.content}`
            let messageList = document.querySelector('#messageList')
            messageList.append(li)
            myForm.querySelector('input[name=content]').value = ''
            myForm.querySelector('input[name=name]').value = ''
          })
      })
    },
  }
controller.init(view,model)
}.call()
