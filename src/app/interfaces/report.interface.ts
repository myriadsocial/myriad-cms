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
    tags?: string[]
    mentions?: User[]
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

export interface Post {
  title?: string
  text: string
  tags: string[]
  mentions: User[]
  platform?: string
  postId?: string
}

export interface User {
  id: string
  name: string
  username: string
  profilePictureURL?: string
  createdAt?: string
}

export interface ReportWithPaginationData {
  data: Report[]
  meta: PaginationMeta
  filter: {
    reportDate: string
    category?: string
    respondDate?: string
    status?: string
    postType?: string
  }
}
