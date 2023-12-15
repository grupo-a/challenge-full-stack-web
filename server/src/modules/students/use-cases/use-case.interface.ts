interface UseCase<UseCasePort, UseCaseResult> {
    execute: (params: UseCasePort) => Promise<UseCaseResult>
}

export type { UseCase }
