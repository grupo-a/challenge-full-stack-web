import server from '../../src/server.js'
import express from 'express'
import cors from 'cors'
import { jest } from '@jest/globals'

describe('server', () => {
  it('should return an express app', () => {
    const app = server(express, cors, jest.fn())
    expect(app).toHaveProperty('use')
    expect(app).toHaveProperty('listen')
  })
})
