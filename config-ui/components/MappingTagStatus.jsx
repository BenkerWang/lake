import MappingTag from './MappingTag'

const MappingTagStatus = ({reqValue, resValue, envName, clearBtnReq, clearBtnRes, onChangeReq, onChangeRes}) => {
  return <>
    <MappingTag
      labelName="Requirement"
      labelIntent="danger"
      values={reqValue}
      helperText={envName}
      rightElement={clearBtnReq}
      onChange={onChangeReq}
    />
    <MappingTag
      labelName="Resolved"
      labelIntent="success"
      values={resValue}
      helperText={envName}
      rightElement={clearBtnRes}
      onChange={onChangeRes}
    />
  </>
}

export default MappingTagStatus
