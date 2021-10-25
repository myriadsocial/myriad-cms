import {PaginationMeta} from '.'

export interface Reporter {
  id: string
  reportId: string
  reportedBy: string
  description: string
  reporter: {
    id: string
    name: string
    profilePictureURL: string
  }
}

export interface ReporterWithPaginationData {
  data: Reporter[]
  meta: PaginationMeta
}
