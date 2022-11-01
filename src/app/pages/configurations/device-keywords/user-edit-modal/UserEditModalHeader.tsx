import {KTSVG} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'

const UserEditModalHeader = () => {
  const {setItemIdForUpdate, itemIdForUpdate} = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{`${itemIdForUpdate ? "Update" : "Add"} Keyword`}</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {UserEditModalHeader}