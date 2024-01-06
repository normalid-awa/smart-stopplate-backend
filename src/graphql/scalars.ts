import { asNexusMethod, enumType } from "nexus";
import { GraphQLDateTime } from "graphql-scalars";

export const GQLDate = asNexusMethod(GraphQLDateTime, "dateTime");

export const Division = enumType({
    name: "Division",
    members: ["OPEN", "STANDARD", "PRODUCTION", "PRODUCTIONOPTICS", "CLASSIC"],
    description: "Shooter divisons",
});