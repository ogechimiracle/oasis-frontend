'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/utils/constant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";


function FAQ(){
    return(
    <Card className="w-full max-w-5xl">
      <CardContent>
        <Accordion type="single" collapsible defaultValue="plans">
          {faqs.map((item, index) => (
            <AccordionItem key={item.id} value={String(item.id)}>
              <AccordionTrigger className="text-black text-lg">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-700 text-md">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
    )
}


export default FAQ