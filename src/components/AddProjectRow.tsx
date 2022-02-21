import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Id } from '../model/model'
import { Project } from '../model/project'
import {
  FormControl, IconButton, Input,
  InputAdornment, InputLabel
} from '../styleguide'
import { AddIcon } from '../styleguide/icons'

const Wrapper = styled.li`
  max-width: 400px;
  display: grid;
  grid-template-columns: 2fr 1fr min-content;
  font: inherit;
  width: 100%;
  place-items: center start;
`

type Props = {
  project: Project,
  addProject?: ({ projectId, allocation }: { projectId: Id, allocation: number }) => void
}

const AddProjectRow: React.FC<Props> = ({ project, addProject }) => {
  const { t } = useTranslation()

  const [allocation, setAllocation] = useState(0)

  return (
    <Wrapper>
      {project.name}

      <FormControl variant="standard">
        <InputLabel>{t('persons.allocation')}</InputLabel>
        <Input
          type="number"
          onChange={(e) => setAllocation(Number(e.currentTarget.value))}
          endAdornment={
            <InputAdornment position="end">%</InputAdornment>
          }
        />
      </FormControl>

      {addProject && <IconButton onClick={() => addProject({ projectId: project.id, allocation })} >
        <AddIcon />
      </IconButton>}
    </Wrapper>
  )
}

export default AddProjectRow
