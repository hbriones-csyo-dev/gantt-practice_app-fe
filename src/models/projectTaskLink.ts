export interface ProjectTaskLinkType {
  id: String
  source: String
  target: String
  type: String
}

export interface ProjectTaskLinkTypeResponse {
  links: ProjectTaskLinkType[]
}
