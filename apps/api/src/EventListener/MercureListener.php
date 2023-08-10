<?php

namespace App\EventListener;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Message;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MercureListener implements EventSubscriberInterface
{
    private $hub;

    public function __construct(HubInterface $hub)
    {
        $this->hub = $hub;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['onMessagePosted', EventPriorities::POST_WRITE],
        ];
    }

    public function onMessagePosted(ViewEvent $event)
    {
        $message = $event->getControllerResult();

        // Check if the entity being posted is a Message
        if ($message instanceof Message) {
            // Create a Mercure update with the message data
            $update = new Update(
                ('https://api.skillswap.wip/api/messages'),
                json_encode([
                    'title' => $message->getTitle(),
                    'content' => $message->getContent(),
                    'owner' => $message->getOwner(),
                    'conversation' => $message->getConversation()
                ])
            );

            // Publish the update
            $this->hub->publish($update);
        }
    }
}

