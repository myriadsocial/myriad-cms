import {PenaltyStatusType, ReportCategoryType, ReportStatusType, ReportType} from '../enums'
import {PaginationMeta} from './pagination-meta.interface'
import {Reporter} from './reporter.interface'

export interface Report {
  id: string
  referenceType: ReportType
  referenceId: string
  type: ReportCategoryType
  status: ReportStatusType
  penaltyStatus: PenaltyStatusType
  totalReported: number
  createdAt: string
  updatedAt: string
  reportedDetail: {
    title?: string
    text?: string
    platform?: string
    postId?: string
    user: {
      id: string
      name: string
      username: string
      profilePictureURL: string
      createdAt: string
    }
  }
  reporters: Reporter[]
}

export interface ReportWithPaginationData {
  data: Report[]
  meta: PaginationMeta
  filter: {
    reportDate: string
    category?: string
    penaltyStatus?: string
    respondDate?: string
    status?: string
  }
}
