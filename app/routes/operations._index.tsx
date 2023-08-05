import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { FormattedMessage, useIntl } from 'react-intl'
import { networks } from '~/lib/stellar'
import HorizonServer, { defaultNetworkAddresses } from '~/lib/stellar/server'

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import OperationTable from '../components/OperationTable'
import { setTitle } from '../lib/utils'

import type { OperationTableProps } from '../components/OperationTable'
import { operations } from '~/lib/stellar/server_request_utils'

export const loader = async () => {
  const server = new HorizonServer(
    networks.future,
    defaultNetworkAddresses.future
  )
  return operations({ server, limit: 30 }).then(json)
}

export default function Operations() {
  const operations: ReadonlyArray<OperationTableProps> = useLoaderData<typeof loader>()
  const { formatMessage } = useIntl()
  setTitle(formatMessage({ id: 'operations' }))
  return (
    <Container>
      <Row>
        <Card>
          <CardHeader>
            <FormattedMessage id="operations" />
          </CardHeader>
          <OperationTable
            records={operations}
            compact={false}
          />
        </Card>
      </Row>
    </Container>
  )
}