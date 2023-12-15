interface IUseCase<UseCasePort, UseCaseResult> {
    execute: (params: UseCasePort) => Promise<UseCaseResult>
}

export type { IUseCase }
