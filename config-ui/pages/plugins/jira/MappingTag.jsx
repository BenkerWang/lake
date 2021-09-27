import { Tooltip, Position, FormGroup, Label, Tag, TagInput } from '@blueprintjs/core'
import styles from '../../../styles/Home.module.css'

const MappingTag = ({labelIntent, labelName, onChange, rightElement, helperText, values}) => {
  return <>
    <p>Tags related to&nbsp;&nbsp;<Tag intent={labelIntent}>{labelName}</Tag></p>

    <div className={styles.formContainer}>
      <FormGroup
        inline={true}
        labelFor="jira-issue-type-mapping"
        helperText={helperText}
        className={styles.formGroup}
        contentClassName={styles.formGroup}
      >
        <Tooltip content={`Map custom Jira types to main ${labelName} status`} position={Position.TOP}>
          <Label>
          <TagInput
            placeholder="Add Tags..."
            values={values}
            fill={true}
            onChange={onChange}
            addOnPaste={true}
            rightElement={rightElement}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
            className={styles.tagInput}
          />
          </Label>
        </Tooltip>
      </FormGroup>
    </div>
  </>
}

export default MappingTag
