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
  postId: string
  userId: string
  createdAt: string
  updatedAt: string
  reportedUser: {
    name: string
    profilePictureURL: string
    createdAt: string
  }
  reportedPost: {
    text: string
    platform: string
    user: {
      name: string
      profilePictureURL: string
    }
  }
  reportedComment: {
    text: string
    postId: string
    user: {
      name: string
      profilePictureURL: string
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
