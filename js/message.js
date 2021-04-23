!function () {
  var view = View('section.message')
  var model = Model({resourceName:'Message'})
  var controller = Controller({
    init:function(view, model){
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessageForm')
      this.loadMessages()
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
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {   //为什么要监听form，不监听button，监听form，回车也能提交
        e.preventDefault()
        let myForm = this.form
        //console.log(myForm, this.form)
        let content = myForm.querySelector('input[name=content]').value
        let name = myForm.querySelector('input[name=name]').value
        this.model.save({'name':name, 'content':content})
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
  })
  controller.init(view, model)
}.call()
