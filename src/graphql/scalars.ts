import { asNexusMethod, enumType } from "nexus";
import { GraphQLDateTime } from "graphql-scalars";

export const GQLDate = asNexusMethod(GraphQLDateTime, "dateTime");

export const Division = enumType({
    name: "Division",
    members: ["OPEN", "STANDARD", "PRODUCTION", "PRODUCTIONOPTICS", "CLASSIC"],
    description: "Shooter divisons",
});

export const StageType = enumType({
    name: "StageType",
    members: ["LONG", "SHORT", "MEDIUM", "OTHER"],
    description: "Stage type",
});

export const ScoreState = enumType({
    name: "ScoreState",
    members: ["DQ", "DNF", "HAVE_NOT_SCORED_YET", "SCORED"],
    description: "Score state",
});