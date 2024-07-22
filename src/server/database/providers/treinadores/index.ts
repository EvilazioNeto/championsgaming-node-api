import * as getAllByCoachId from "./getAllByCoachId"
import * as create from "./create"
import * as getById from "./getById"
import * as deleteById from "./deleteById"
import * as updateById from "./updateById"


export const TreinadoresProvider = {
    ...create,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAllByCoachId,
}