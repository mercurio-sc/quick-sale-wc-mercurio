export enum Index {
  Departments = 'departments',
  Cities = 'cities',
}

export interface ElasticResponse<THit> {
  took: number
  timed_out: boolean
  _shards: Shards
  hits: Hits<THit>
}

export interface Shards {
  total: number
  successful: number
  skipped: number
  failed: number
}

export interface Hits<THit> {
  total: Total
  max_score: number
  hits: Hit<THit>[]
}

export interface Hit<THit> {
  _index: Index
  _type: Type
  _id: string
  _score: number
  _source: THit
}

export enum Type {
  Doc = '_doc',
}

export interface Total {
  value: number
  relation: string
}

export interface DepartmentResource {
  Name: string
  DepartmentId: string
  IsActive: string
  isCoordinadora: IsCoordinadora
  CodDep: string
}

export enum IsCoordinadora {
  IsCoordinadora = '{{isCoordinadora}}',
}

export interface CityResource {
  isCoordinadora: string
  IsActive: string
  LocationCode: string
  CodDep: string
  DepartmentId: string
  PopulationTypeId: string
  Name: string
}
