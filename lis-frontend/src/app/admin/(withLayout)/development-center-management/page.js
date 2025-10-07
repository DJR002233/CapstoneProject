import Admin_location_table from '@/pages/admin/development_center_management/admin_location_table'
import Location_form_inputs from '@/pages/admin/development_center_management/location_form_inputs'

export default function DevelopmentCenterManagement() {
    return (
        <>
            <p className="my-3 text-center text-lg font-bold">
                Development Center Management
            </p>
            <div className="flex flex-wrap">
                <Location_form_inputs />
                <Admin_location_table />
            </div>
        </>
    )
}
