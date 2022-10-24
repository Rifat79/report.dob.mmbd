import { useEffect, useState } from 'react'
import { initialQueryState, KTSVG } from '../../../../../../../_metronic/helpers'
import { MenuComponent } from '../../../../../../../_metronic/assets/ts/components'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import 'rsuite/dist/rsuite.min.css';
import { deviceTypeOptions } from '../../../../../../constants/constants'
import { getQueryRequest } from '../../../../../../modules/helpers/api'
import { GET_MODEL_LIST } from '../../../../../../constants/api.constants'
import { getAuth } from '../../../../../../modules/auth'
import { createGroup, isDate, reactSelectify } from '../../../../../../modules/helpers/helper'
import DateRange from '../../../../../../../_metronic/partials/custom-modules/DateRange'
import SelectSubmenu from '../../../../../../modules/partials/custom-select-with-submenu'
import DateRange2 from '../../../../../../../_metronic/partials/custom-modules/date-range'
import moment from 'moment'

const UsersListFilter = () => {
  const { updateState, state } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [deviceType, setDeviceType] = useState({id: 1, label: 'Smart Phone', value: 1});
  const [options, setOptions] = useState([{}]);
  const [models, setModels] = useState([{}]);
  const [allModelList, setAllModelList] = useState<any>([])
  const [model, setModel] = useState<any>(null);
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const [date, setDate] = useState<any>()
  const auth = getAuth();

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState })
  }

  const handleDeviceTypeOptionChange = (selectedOption: any) => {
    setDeviceType(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleModelOptionChange = (selectedOption: any) => { 
    setModel(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const filterData = () => {
    updateState({
      filter: isDate(date?.start_date) && isDate(date?.end_date) ? { 
        start_date: `${date?.start_date} 00:00:00`,
        end_date: `${date?.end_date} 23:59:59`,
        model: model?.model
      } : {
        model: model?.model
      },
      ...initialQueryState,
    })
  }

  useEffect(() => {
    
    callAPI();
    
  }, [])
  
  const callAPI = async () => { 
    const res: any = await getQueryRequest(`${GET_MODEL_LIST}?&deviceType=1`);
    const res2: any = await getQueryRequest(`${GET_MODEL_LIST}?&deviceType=2`);
    if(res2?.data && res?.data) {
      // const models = reactSelectify(res?.data, 'model') || [];
      // setModels(models);
      const optionList = [
        createGroup('---Smart Phone---', reactSelectify(res?.data, 'model'), setModel),
        createGroup('---Feature Phone---', reactSelectify(res2?.data, 'model'), setModel)
      ]
      setOptions(optionList)
      setAllModelList([ ...res?.data, ...res2?.data]);

      // setting model in filter state
      const search = window.location.search;
      const modelFromURL = new URLSearchParams(search).get('model');
      const type1 = res?.data?.filter((e: any) => e?.model == modelFromURL)[0]
      const type2 = res2?.data?.filter((e: any) => e?.model == modelFromURL)[0]
      if(type1) {
        updateState({
          filter: {
            model: type1?.model
          },
          ...initialQueryState,
        });
        setModel(type1)
      } else if(type2) {
          updateState({
            filter: {
              model: type2?.model
            },
            ...initialQueryState,
          });
          setModel(type2)
      }
    }
  };


  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-sm btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          {/* <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Device Type:</label>
            <Select options={deviceTypeOptions} onChange={handleDeviceTypeOptionChange} value={deviceType}/>
          </div> */}
          {/* end::Input group */}

          {/* begin::Input group */}
          {/* <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Select Model:</label>
              <SelectSubmenu options={options} value={model} setModel={setModel}/>
          </div> */}
          <div className="form-group row">
            <label className='form-label fs-6 fw-bold'>Select Model:</label>
            <div className="mb-3 ">
              <select className="form-control select2" onChange={(e) => setModel(allModelList?.filter((el: any) => el?.model == e.target.value)[0])} id="kt_select2_2" name="param">
                {/* <optgroup label="Alaskan/Hawaiian Time Zone" style={{fontWeight: 'bolder'}}>
                  <option value="AK">Alaska</option>
                  <option value="HI">Hawaii</option>
                </optgroup> */}
                <option label='Select a model...'></option>
                {options?.map((item: any, indx) => (
                  item?.options?.length > 0 && (
                    <optgroup label={item?.label?.props?.children} style={{fontWeight: 'bolder'}}>
                      {item?.options?.map((item: any, indx: any) => (
                        <option value={item?.model} selected={item?.model == model?.model}>{item?.model}</option>
                      ))}
                    </optgroup>
                  )
                ))}
                {!allModelList || allModelList?.length == 0 && (<option>No Options</option>)}
              </select>
            </div>
          </div>
          {/* end::Input group */}
          <div className='mb-10 position-relative' id='date-range-ref'>
            {/* <label className='form-label fs-6 fw-bold'>Range:</label>
              <DateRange callBack={(e: any) => setDate(e)}/> */}
              <DateRange2  startDate={''} endDate={''}  callBack={(e: any) => setDate(e)}/>
          </div>
          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export { UsersListFilter }
