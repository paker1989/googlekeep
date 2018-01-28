/* eslint no-unused-expressions: off */
export const noteActions = {
  deleteNote: {
    label: '删除这条记事',
    isVisible: true,
    event: 'deleteNote'
  },
  addTag: {
    label: '添加标签',
    isVisible: true,
    event: 'addTag'
  },
  changeTag: {
    label: '更改标签',
    isVisible: true,
    event: 'changeTag'
  },
  // refactToCheckList: {
  //   label: '显示复选框',
  //   isVisible: true,
  //   event: 'refactToCheckList'
  // },
  // refactToNote: {
  //   label: '隐藏复选框',
  //   isVisible: true,
  //   event: 'refactToNote'
  // },
  // duplicateNote: {
  //   label: '复制',
  //   isVisible: true,
  //   event: 'duplicateNote'
  // }
}

export function updateActionItems(tags, noteId, type) {
  // console.log(vm)
  // const tags = note ? note.tags : vm.tags
  // const noteId = note ? note._id : vm.noteId
  // const type = note ? note.type : vm.type
  // console.log(tags)
  // console.log(noteId)
  // console.log(type)
  const actionItems = Object.assign({}, noteActions)

  if (actionItems.changeTag) {
    actionItems.changeTag.isVisible = tags ? tags.length > 0 : false
  }

  // actionItems.changeTag
  // && (actionItems.changeTag.isVisible = (tags && tags.length > 0))

  if (actionItems.deleteNote) {
    // console.log(`isDelete: ${!!noteId}`)
    // const s = !!noteId
    // console.log(s)
    actionItems.deleteNote.isVisible = noteId
  }


  if (actionItems.addTag) {
    actionItems.addTag.isVisible = tags ? tags.length === 0 : false
  }

  if (actionItems.refactToCheckList) {
    actionItems.refactToCheckList.isVisible = type ? type === 'note' : false
  }

  if (actionItems.refactToNote) {
    actionItems.refactToNote.isVisible = type ? type !== 'note' : false
  }

  if (actionItems.duplicateNote) {
    actionItems.duplicateNote.isVisible = !!noteId
  }
  // console.log(actionItems)
  return actionItems
}

