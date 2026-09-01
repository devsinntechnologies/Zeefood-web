"use client";

import { useParams } from "next/navigation";
import QRMenuRoute from "@/components/qr-menu/QRMenuRoute";

export default function QRMenuPage() {
  const params = useParams<{ token: string }>();
  return <QRMenuRoute token={String(params?.token ?? "")} />;
}
