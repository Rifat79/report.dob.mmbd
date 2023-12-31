import {FC} from 'react'

type Props = {
  roleList?: []
}

const UserPermissionCell: FC<Props> = ({roleList = []}: any) => {
  let permissions = [];
  const permissionList = roleList?.modulesList || []; 
  for(let i = 0; i < permissionList.length; i++) {
    permissions.push(permissionList[i].moduleName);
  }
  
  return (
    <>
      {permissions?.map((item, indx) => (
        <div className='badge badge-primary fw-bolder' style={{marginRight: 2}} key={indx}>{item}</div>
      ))}
    </>
  )
}

export {UserPermissionCell}
