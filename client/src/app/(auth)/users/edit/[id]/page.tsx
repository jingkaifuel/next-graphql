"use client";

import getUserById, { GetUserByIdResponse } from "@/api/user/getUserById";
import PageHeader from "@/app/_components/page-header/page-header";
import client from "@/app/_lib/apolloClient";
import { useSuspenseQuery } from "@apollo/client";
import { Container, Spinner } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import DetailsForm from "./detailsForm";
import ResetPasswordForm from "./resetPasswordForm";
import useAuthStore from "@/app/_store/authStore";

export default function Page() {
  const { id } = useParams();
  const { user } = useAuthStore();

  // Query
  const { data } = useSuspenseQuery<GetUserByIdResponse>(getUserById, {
    client,
    variables: { id },
  });

  return (
    <Container className="wrapper small">
      <PageHeader title="Edit User" />

      <Suspense fallback={<Spinner size="3" m="auto" />}>
        <DetailsForm user={data} />
      </Suspense>

      {user?._id === id ? (
        <>
          <PageHeader title="Reset Password" showBack={false} />

          <Suspense fallback={<Spinner size="3" m="auto" />}>
            <ResetPasswordForm />
          </Suspense>
        </>
      ) : null}
    </Container>
  );
}
