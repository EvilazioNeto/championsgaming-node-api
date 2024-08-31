import * as getAllByClubId from "./getAllByClubId"
import * as create from "./create"
import * as getById from "./getById"
import * as deleteById from "./deleteById"
import * as updateById from "./updateById"


export const TreinadoresProvider = {
    ...create,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAllByClubId,
}