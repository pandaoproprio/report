import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  tenantName: z.string().min(3, "Nome da academia deve ter pelo menos 3 caracteres"),
  tenantSubdomain: z.string()
    .min(3, "Subdomínio deve ter pelo menos 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "Subdomínio deve conter apenas letras minúsculas, números e hífens"),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validar dados
    const validatedData = registerSchema.parse(body)

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      )
    }

    // Verificar se subdomínio já existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { subdomain: validatedData.tenantSubdomain },
    })

    if (existingTenant) {
      return NextResponse.json(
        { error: "Subdomínio já está em uso" },
        { status: 400 }
      )
    }

    // Hash da senha
    const passwordHash = await hash(validatedData.password, 12)

    // Criar tenant e usuário em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar tenant
      const tenant = await tx.tenant.create({
        data: {
          name: validatedData.tenantName,
          subdomain: validatedData.tenantSubdomain,
          slug: validatedData.tenantSubdomain,
          status: "TRIAL",
          plan: "STARTER",
        },
      })

      // Criar usuário admin
      const user = await tx.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          passwordHash,
          role: "ADMIN",
          tenantId: tenant.id,
          emailVerified: new Date(), // Auto-verificar por enquanto
        },
      })

      return { tenant, user }
    })

    return NextResponse.json(
      {
        success: true,
        tenant: {
          id: result.tenant.id,
          name: result.tenant.name,
          subdomain: result.tenant.subdomain,
        },
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Erro ao criar conta:", error)
    return NextResponse.json(
      { error: "Erro ao criar conta" },
      { status: 500 }
    )
  }
}
