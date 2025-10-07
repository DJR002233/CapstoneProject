import '@/css/tableBorder.css'
import { getArchivedGrade } from '@/app/_lib/fetch'
import Scores from '@/pages/faculty/gradesandmappingvisualization/scores'
import Header from '@/pages/faculty/registrationforms/header'

export default async function GradesView(path) {
    const reg_no = await path.searchParams,
        grade = await getArchivedGrade(reg_no),
        keys = ['last_name', 'first_name', 'middle_name', 'suffix']
    let child_name = null
    for (let i = 0; i < grade.length; i++) {
        if (i == 0) {
            child_name =
                grade[i][keys[0]] +
                ', ' +
                grade[i][keys[1]] +
                ' ' +
                grade[i][keys[3]]
            if (grade[i][keys[2]])
                child_name =
                    grade[i][keys[0]] +
                    ', ' +
                    grade[i][keys[1]] +
                    ' ' +
                    grade[i][keys[2]].substring(0, 1) +
                    '. ' +
                    grade[i][keys[3]]
        }
        for (let x = 0; x < 4; x++) {
            delete grade[i][keys[x]]
        }
    }
    return (
        <div className="mx-3 mb-20 mt-5 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-20">
            <Header backButton_link="/faculty-portal/archives" />
            <div className="mt-10">
                <p className="text-xl font-bold">Name: {child_name}</p>
            </div>
            <Scores data={grade} />
        </div>
    )
}
