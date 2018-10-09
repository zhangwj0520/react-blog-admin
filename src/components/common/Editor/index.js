import React from 'react'
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

class Editor extends React.Component {
    state = {
        // 创建一个空的editorState作为初始值
        editorState: EditorState.createFrom('')
  }
      async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = this.props.value
        // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据
        this.setState({
            editorState: EditorState.createFrom(htmlContent)
        })
    }
   uploadFn = (param) => {
    const serverURL = 'http://adm.qqzi.com/Home/UploadImage'
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    const successFn = () =>
      param.success({ url: JSON.parse(xhr.responseText).Result })
    const progressFn = (event) =>
      param.progress((event.loaded / event.total) * 100)
    const errorFn = () => param.error({ msg: 'unable to upload.' })
    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)
    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }
  // handleChange = (content) => { 
  //   console.log(content)
  //    if (this.props.onChange) {    
  //     this.props.onChange(content.toHTML())
  //   }
  // }

      submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        //console.log(htmlContent)
        await this.props.onChange(htmlContent)
        
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

  render() {
   // console.log(this.props.value)
    //this.status.editorState= EditorState.createFrom(this.props.value)
    const { editorState } = this.state
    //console.log(editorState)
    const editorProps = {
      
      contentFormat: 'html',
      height: 500,
      initialContent: this.props.value,
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        uploadFn: this.uploadFn // 指定上传函数，说明见下文
      },
      onChange: this.handleEditorChange,
      onBlur: this.submitContent,
      placeholder:
        this.props.placeholder ||
        '发表文章，记录自己这段时间的学习，技术需要沉淀'
    }
    return (
      <div className="braft-editor">
        <BraftEditor
          value={editorState}
          {...editorProps} />
      </div>
    )
  }
}

export default Editor



// export default class Editor extends React.Component {

//     state = {
//         // 创建一个空的editorState作为初始值
//         editorState: EditorState.createFrom('')
//     }

//     async componentDidMount () {
//         // 假设此处从服务端获取html格式的编辑器内容
//         const htmlContent = "<p>dddd</p>"
//         // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据
//         this.setState({
//             editorState: EditorState.createFrom(htmlContent)
//         })
//     }

//     submitContent = async () => {
//         // 在编辑器获得焦点时按下ctrl+s会执行此方法
//         // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
//         const htmlContent = this.state.editorState.toHTML()
//         //const result = await saveEditorContent(htmlContent)
//     }

//     handleEditorChange = (editorState) => {
//         this.setState({ editorState })
//     }

//     render () {

//         const { editorState } = this.state
//         return (
//             <div className="my-component">
//                 <BraftEditor
//                     value={editorState}
//                     onChange={this.handleEditorChange}
//                     onSave={this.submitContent}
//                 />
//             </div>
//         )

//     }

// }
