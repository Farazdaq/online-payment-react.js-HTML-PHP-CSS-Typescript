<?php

namespace Payment;

use Omnipay\Omnipay;

class Payment

{

    /**

     * Create and configure the payment gateway.

     *

     * @return \Omnipay\Common\GatewayInterface

     */

    public function gateway()

    {

        $gateway = Omnipay::create('PayPal_Express');

        $gateway->setUsername("sb-7j4hl606677@personal.example.com");

        $gateway->setPassword("ARySNgUCvyU9tEBp-zsd0WbbNO_7Nxxxxoi3xxxxh2cTuDxRh7xxxxVu9W5ZkIBGYqjqfzHrjY3wta");

        $gateway->setSignature("EOEwezsNWMWQM63xxxxxknr8QLoAOoC6lD_-kFqjgKxxxxxwGWIvsJO6vP3syd10xspKbx7LgurYNt9");

        $gateway->setTestMode(true);

        return $gateway;

    }

    /**

     * Process a purchase transaction.

     *

     * @param array $parameters

     * @return \Omnipay\Common\Message\ResponseInterface

     */

    public function purchase(array $parameters)

    {

        $response = $this->gateway()

            ->purchase($parameters)

            ->send();

        return $response;

    }

    /**

     * Complete a purchase transaction.

     *

     * @param array $parameters

     * @return \Omnipay\Common\Message\ResponseInterface

     */

    public function complete(array $parameters)

    {

        $response = $this->gateway()

            ->completePurchase($parameters)

            ->send();

        return $response;

    }

    /**

     * Format an amount with two decimal places.

     *

     * @param float $amount

     * @return string

     */

    public function formatAmount($amount)

    {

        return number_format($amount, 2, '.', '');

    }

    /**

     * Get the cancel URL for a given order.

     *

     * @param string $order

     * @return string

     */

    public function getCancelUrl($order = "")

    {

        return $this->route('https://demo.example.com/cancel.php', $order);

    }

    /**

     * Get the return URL for a given order.

     *

     * @param string $order

     * @return string

     */

    public function getReturnUrl($order = "")

    {

        return $this->route('https://demo.example.com/return.php', $order);

    }

    /**

     * Generate a URL for a given route and parameters.

     *

     * @param string $name

     * @param mixed $params

     * @return string

     */

    public function route($name, $params)

    {

        return $name; // URL generation logic can be added here

    }

}