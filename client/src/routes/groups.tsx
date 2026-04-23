import {  createFileRoute } from "@tanstack/react-router";
import Groups from "../components/GroupedErrors/Groups";

export const Route = createFileRoute('/groups')({
  component:Groups
})